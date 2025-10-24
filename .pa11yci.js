module.exports = {

	defaults: {

		/* [INFO] Launch options for the headless Chrome:
		https://github.com/pa11y/pa11y#chromelaunchconfig-object
		https://pptr.dev/api/puppeteer.launchoptions */
		chromeLaunchConfig: {
			args: [
				"--no-sandbox"
			]
			// headless: "shell"
		},
	}
};
