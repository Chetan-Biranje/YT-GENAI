const { test } = require("node:test")
const assert = require("node:assert/strict")
const { randomBytes } = require("node:crypto")
const mongoose = require("mongoose")
const app = require("../src/app")
const User = require("../src/models/user.model")
const Blacklist = require("../src/models/blacklist.model")

test("register, login, profile and logout against isolated MongoDB", async () => {
  assert.ok(process.env.MONGO_TEST_URI, "Set MONGO_TEST_URI to a dedicated test database")
  process.env.JWT_SECRET = randomBytes(48).toString("hex")
  const dbName = "yt_genai_test_" + randomBytes(8).toString("hex")
  await mongoose.connect(process.env.MONGO_TEST_URI, { dbName })
  let server
  try {
    await Promise.all([User.init(), Blacklist.init()])
    server = app.listen(0, "127.0.0.1")
    await new Promise((resolve, reject) => {
      server.once("listening", resolve)
      server.once("error", reject)
    })
    const url = "http://127.0.0.1:" + server.address().port + "/api"
    const post = (route, data, cookie) => fetch(url + route, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) },
      body: JSON.stringify(data)
    })
    const user = { username: "test-user", email: "test@example.test", password: "Test-password-123" }
    assert.equal((await fetch(url + "/health")).status, 200)
    assert.equal((await post("/auth/register", { ...user, password: "short" })).status, 400)
    assert.equal((await post("/auth/register", { ...user, email: "not-an-email" })).status, 400)
    assert.equal((await post("/auth/login", { email: user.email, password: 123 })).status, 400)
    const registered = await post("/auth/register", user)
    assert.equal(registered.status, 201)
    assert.equal((await registered.json()).user.email, user.email)
    const login = await post("/auth/login", { email: user.email, password: user.password })
    assert.equal(login.status, 200)
    const cookie = login.headers.get("set-cookie").split(";")[0]
    const profile = await fetch(url + "/auth/get-me", { headers: { Cookie: cookie } })
    assert.equal(profile.status, 200)
    assert.equal((await profile.json()).user.username, user.username)
    assert.equal((await post("/auth/logout", {}, cookie)).status, 200)
  } finally {
    if (server) await new Promise(resolve => server.close(resolve))
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
  }
})
