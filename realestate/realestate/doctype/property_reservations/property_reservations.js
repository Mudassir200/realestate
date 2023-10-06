// Copyright (c) 2023, Mudassir and contributors
// For license information, please see license.txt

frappe.ui.form.on('Property Reservations', {
	refresh: function(frm) {
		frm.set_query("property_id", function(){
			return {
				"filters": [
					["Realestate Property", "project_id", "=", frm.doc.project_id],
				]
			}
		}); 
	}
});
