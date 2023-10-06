// Copyright (c) 2023, Mudassir and contributors
// For license information, please see license.txt

frappe.ui.form.on('Realestate Property', {
	refresh: function (frm) {
		frm.set_query("project_id", function () {
			return {
				"filters": [
					["Realestate Project", "multistage", "=", 0],
				]
			}
		});
		frm.set_query("property_type", function () {
			return {
				"filters": [
					["Property Type", "active", "=", 1]
				]
			}
		});
		frm.set_query("property_status", function () {
			return {
				"filters": [
					["Property Status", "active", "=", 1]
				]
			}
		});
	},
	validate: async function (frm) {
		await validatePropertyNumber(frm);
	}
});

async function validatePropertyNumber(frm) {
	let doc = await frappe.call({
		method: "frappe.client.get_value",
		args: {
			doctype: "Realestate Property",
			fieldname: "name",
			filters: { "property_number": frm.doc.property_number, "project_id": frm.doc.project_iid }
		}
	});
	if (doc.message?.name && frm.doc.name != doc.message.name) {
		msgprint("Valid Lot No Required.This already used!!!");
		frappe.validated = false;
	} else {
		let project = await frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "Realestate Project",
				name: frm.doc.project_id,
			}
		});
		if (project.message) {
			frm.doc.property_name = project.message.project_name + " - " + frm.doc.property_number
		}
	}
}