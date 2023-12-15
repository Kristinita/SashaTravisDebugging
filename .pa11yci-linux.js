/*
[OPTIONS]
https://github.com/pa11y/pa11y#configuration

JavaScript example configuration for Pa11y-CI with options:
https://github.com/pa11y/pa11y-ci/issues/159#issuecomment-1360561500

[INFO] File “.pa11yci” must be JSON. JavaScript syntax will not work for it.
The user must create a JavaScript configuration file with a different name
and reference this file when running pally-ci — “pa11y-ci --config .pa11yci.js”

[INFO] Pa11y actions — additional interations for web page:
https://github.com/pa11y/pa11y#actions

[NOTE] Pa11y haven’t action for “::selection”, “:focus” and “:hover”:
https://github.com/pa11y/pa11y/issues/398#issuecomment-1857885618
*/

module.exports = {
	defaults: {
		chromeLaunchConfig: {
      		"executablePath": "/usr/bin/google-chrome"
    	},
		hideElements: [

			/* [FIXME][ACCESSIBILITY] Don’t check content between “<pre><code></code></pre>”:
			https://github.com/pa11y/pa11y#hideelements-string

			I need to migrate to Pygments color scheme that supports WCAG 2.1 AA contrast minimum:
			https://pygments.org/styles/ */
			"code",

			/* [INFO][FIXME] Non-accessible third-party elements.
			If it possible, I need to fix accessibility dinamically.

			[INFO] Elements from Programmable Search Engine
			*/
			"#___gcse_0", ".gstl_50",

			// [INFO] ELements from Google Translate
			".skiptranslate", "#goog-gt-votingForm", "#goog-gt-votingInputSrcLang",
			"#goog-gt-votingInputTrgLang", "#goog-gt-votingInputSrcText", "#goog-gt-votingInputTrgText",
			"#goog-gt-votingInputVote", "#goog-gt-votingHiddenPane"
			]
	}
};
