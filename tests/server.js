var
http = require('http'),
url = require('url'),
flattr = require('../flattr');

var app =  {
	client_id:
	'w0HQL9L9mcAG4Ye7FzN44L7MnsiPJ9150yMCynBKq2gkRlimKVhFxeiLxqq6qh2g',
	client_secret:
	'GEI4SaE82LjKWrWxd42A9acwqstGzmN6Rm0zmvyf7IQUZCh3w9tw9vSqObXeoAa5',
	redirect_uri: 'http://localhost:8080/flattr'
};

var NUM_TESTS = 0;

console.log('Server started at: http://localhost:8080');

http.createServer(function (req, res) {
	var path = url.parse(req.url).pathname;

	if (path == '/') {
		res.end('<a href="https://flattr.com/oauth/authorize?response_type=code&client_id=w0HQL9L9mcAG4Ye7FzN44L7MnsiPJ9150yMCynBKq2gkRlimKVhFxeiLxqq6qh2g&scope=flattr thing extendedread">Login to flattr.</a>');
	}
	else if (path == '/flattr') {
		runtests(req, res);
	}
	else {
		res.writeHead(404);
		res.end();
	}
}).listen(8080);


function runtests(req, res) {

	NUM_TESTS = 1;
	
	var code = url.parse(req.url, true).query.code;

	res.write('<table><tr><th>Resource</th><th>Message</th><th>Status</th></tr>');
	
	flattr.request_token(app, code, function (token) {
		/*
		flattr.flattrs.list('flattr', {count: 9}, function (data) {
			done(res, {
				resource: 'flattrs.list',
				message: data.error ? data.error_description : "Found: "+data.length,
				status: data.error ? true : false
			});
		});

		flattr.flattrs.list_auth(token, function (data) {
			done(res, {
				resource: 'flattrs.list_auth',
				message: data.error ? data.error_description : "Found: "+data.length,
				status: data.error ? true : false
			});	
		});

		//
		// NOTE: This will flattr FSF Europe and draw funds from your account
		//
		flattr.flattrs.thing(token, 96089, function (data) {
			done(res, {
				resource: 'flattrs.thing',
				message: data.error ? data.error_description : data.description,
				status: data.error ? true : false
			});
		});


		//
		// NOTE: This will flattr node-flattr and draw funds from your account
		//
		var params = {
			title: 'node-flattr: NodeJS module for the flattr API.',
			tags: 'nodejs, module, api, flattr'
		};
		flattr.flattrs.url(token, 'https://github.com/antics/node-flattr', 'antics', params, function (data) {
			done(res, {
				resource: 'flattrs.url',
				message: data.error ? data.error_description : data.description,
				status: data.error ? true : false
			});
		});

		flattr.things.list('flattr', {count: 10}, function (data) {
			done(res, {
				resource: 'things.list',
				message: data.error ? data.error_description : 'Found: '+data.length,
				status: data.error ? true : false
			});	
		});

		flattr.things.get(423405, function (data) {
			done(res, {
				resource: 'things.get',
				message: data.error ? data.error_description : data.title,
				status: data.error ? true : false
			});	
		});

		flattr.things.get([423405, 450287], function (data) {
			done(res, {
				resource: 'things.get (multiple)',
				message: data.error ? data.error_description : data[0].id+','+data[1].id,
				status: data.error ? true : false
			});	
		});

		flattr.things.exists('https://github.com/antics/node-flattr', function (data) {
			done(res, {
				resource: 'things.exists',
				message: data.error ? data.error_description : data.message,
				status: data.error ? true : false
			});	
		});

		flattr.things.create(token, 'http://yogakendra.se', function (data) {
			done(res, {
				resource: 'things.create',
				message: data.error ? data.error_description : data.message+':'+data.id,
				status: data.error ? true : false
			});				
		});

		flattr.things.update(token, 506428, {title: 'Yoga Kendra'}, function (data) {
			done(res, {
				resource: 'things.update',
				message: data.error ? data.error_description : data.description,
				status: data.error ? true : false
			});				
		});

		flattr.things.del(token, 506517, function (data) {
			done(res, {
				resource: 'things.del',
				message: data.error ? data.error_description : data.message,
				status: data.error ? true : false
			});				
		});
		*/

		flattr.things.search({query: "nature", tags: 'photo'}, function (data) {
			done(res, {
				resource: 'things.search',
				message: data.error ? data.error_description : 'Total: '+data.total_items,
				status: data.error ? true : false
			});							
		});
	});
};


function done (res, info) {
	var status = info.status ? '<strong>FAIL</strong>' : 'OK';

	res.write('<tr><td>'+info.resource+'</td><td>'+info.message+'</td><td>'+status+'</td>');
	
	NUM_TESTS--;

	if (NUM_TESTS == 0)
		res.end('</table>');
}
