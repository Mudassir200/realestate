// Copyright (c) 2023, Mudassir and contributors
// For license information, please see license.txt

frappe.ui.form.on('Realestate Project', {
	refresh: function (frm) {
		frm.set_query("agent_id", function () {
			return {
				"filters": [
					["Vendor", "vendor_group_name", "=", "Agent"],
				]
			}
		});
		frm.set_query("builder_id", function () {
			return {
				"filters": [
					["Vendor", "vendor_group_name", "=", "Builder"],
				]
			}
		});
		frm.set_query("developers", function () {
			return {
				"filters": [
					["Vendor", "vendor_group_name", "=", "Developer"],
				]
			}
		});
		frm.set_query("parent_project_id", function () {
			return {
				"filters": [
					["Realestate Project", "multistage", "=", "1"],
				]
			}
		});
		frm.set_query("city", function () {
			if (frm.doc.state && frm.doc.country) {
				return {
					"filters": [
						["City", "country", "=", frm.doc.country],
						["City", "state", "=", frm.doc.state],
						["City", "active", "=", 1]
					]
				}
			} else {
				return {
					"filters": [
						["City", "country", "=", frm.doc.country],
						["City", "active", "=", 1]
					]
				}
			}
		});
		frm.set_query("state", function () {
			return {
				"filters": [
					["State", "country", "=", frm.doc.country],
					["State", "active", "=", 1]
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
	},
	before_save: async function (frm) {
		frm.doc.full_address = await fullAddress(frm);
	},
});

async function fullAddress(frm) {
	let address = "";
	if (frm.doc.street_address) address = frm.doc.street_address

	if (frm.doc.city) {
		let doc = await frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "City",
				name: frm.doc.city
			}
		});
		if (doc.message?.city_name) {
			if (address) address += ", " + doc.message.city_name
			else address = doc.message.city_name
		}
	}

	if (frm.doc.country) {
		let doc = await frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "Country",
				name: "",
				filters: { "country_name": frm.doc.country },
			}
		});
		if (doc.message?.code) {
			if (address) address += ", " + doc.message.code.toUpperCase()
			else address = doc.message.code.toUpperCase()
		}
	}

	if (address && frm.doc.zipcode) address += ", " + frm.doc.zipcode
	else if (frm.doc.zipcode) address = frm.doc.zipcode

	return address;
}
