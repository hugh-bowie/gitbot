const links = [
	'assets/Nalmefene_HCl_Injection_ISI.pdf',
	'https://www.accessdata.fda.gov/spl/data/d4bb0797-a4ed-4ed4-9904-604433eea4ff/d4bb0797-a4ed-4ed4-9904-604433eea4ff.xml',
	'assets/Nalmefene_HCl_Injection_ISI.pdf',
	'https://nalmefenehcl.com',
	'https://nalmefenehcl.com',
	'https://www.fda.gov/medwatch',
	'https://www.accessdata.fda.gov/spl/data/d4bb0797-a4ed-4ed4-9904-604433eea4ff/d4bb0797-a4ed-4ed4-9904-604433eea4ff.xml',
	'{{unsubscribe_product_link}}'
];

const items = [...(new Set(links))];

console.log(items)