import * as test from "lib/test"
import * as orm from "lib/orm"
import * as system from "lib/system"
import * as views from "lib/views"

export function testNameNullableUI() {
    let c = test.setTenantContext()

    system.installExtension(c, "demo", "firstName")

    let model = orm.loadModel(c, "customer")

    let name = model.fields.first(t => t.name == "name")
    assert.isTrue(convert.toBool(name.nullableUI))
}

export function testSave() {
    let c = test.setTenantContext()

    system.installExtension(c, "demo", "firstName")

    let customer = orm.save("customer", {
        firstName: "Bill",
        lastName: "Gates"
    })

    let name = orm.queryValue("SELECT name FROM customer WHERe id = ?", customer.id)
    assert.equal("Bill Gates", name)
}


export function testViewFields() {
    let c = test.setTenantContext()

    system.installExtension(c, "demo", "firstName")

    let view = views.loadView(c, "//customer/:id")

    assert.equal(0, view.findElements("//FormField[@name='name']").length)
    assert.equal(1, view.findElements("//FormField[@name='firstName']").length)
    assert.equal(1, view.findElements("//FormField[@name='lastName']").length)
}