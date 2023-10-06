// Copyright (c) 2023, Mudassir and contributors
// For license information, please see license.txt

frappe.ui.form.on('Capital City', {
	refresh: function(frm) {
		frm.set_query("state", function () {
			return {
				"filters": [
					["State", "country", "=", frm.doc.country],
					["State", "active", "=", 1]
				]
			}
		});
	}
});
