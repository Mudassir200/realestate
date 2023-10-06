// Copyright (c) 2023, Mudassir and contributors
// For license information, please see license.txt

frappe.ui.form.on('Vendor', {
	primary_address: function(frm){
		if(frm.doc.primary_address){
			console.log(frm.doc.primary_address)
			frappe.call({
				method: 'frappe.contacts.doctype.address.address.get_address_display',
				args: {
					"address_dict": frm.doc.primary_address
				},
				callback: function(r) {
					frm.set_value("preview_address", r.message);
				}
			});
		}
		if(!frm.doc.primary_address){
			frm.set_value("preview_address", "");
		}
	}
});
