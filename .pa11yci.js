/*
	@Author: Kristinita
	@Date: 2025-02-20 17:25:48
	@Last Modified by: Kristinita
	@Last Modified time: 2025-04-06 10:24:51
*/

/* ######
# Pa11y #
#########
[OVERVIEW] Pa11y — accessibility checker:
https://pa11y.org/

[INFO] Pa11y CI — CLI for CI usage:
https://github.com/pa11y/pa11y-ci
https://andrewmee.com/posts/automated-accessibility-testing-node-travis-ci-pa11y/

[INFO] Pa11y and Pa11y CI tutorials:
https://pa11y.org/tutorials/


[CONFIGURATION] Pa11y configuration:
https://github.com/pa11y/pa11y#configuration

Additional Pa11y CI configuration options:
https://github.com/pa11y/pa11y-ci#default-configuration

[INFO] JavaScript example configuration for Pa11y-CI with options:
https://github.com/pa11y/pa11y-ci/issues/159#issuecomment-1360561500


[CLI][OPTIONS]
https://github.com/pa11y/pa11y#command-line-interface


[RULES]
HTML_CodeSniffer WCAG 2.1 Standard rules:
https://squizlabs.github.io/HTML_CodeSniffer/Standards/WCAG2/

HTML_CodeSniffer “Section 508” rules:
https://squizlabs.github.io/HTML_CodeSniffer/Standards/Section508/

Axe rules:
https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
Axe uses WCAG (Web Content Accessibility Guidelines) 2.0, 2.1, 2.2 rules,
its own “Best Practices” rules and experimental rules disabled by default.

[INFO] WCAG 2.2 success criteria:
https://www.digitala11y.com/wcag-2-2-is-finally-here/

[NOTE] CodeSniffer doesn’t support WCAG 2.2 rules:
https://github.com/squizlabs/HTML_CodeSniffer/issues/315

[INFO] Axe supports automatically testing solely for “target-size” WCAG 2.2 rule:
https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-22-level-a--aa-rules

[NOTE][FIXME][ISSUE] I can’t find, how I can use Axe experimental rules on Pa11y.
Possibly, I can’t do it:
https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#experimental-rules
Pa11y “rules” option solely for CodeSniffer:
https://github.com/pa11y/pa11y#rules-array


[INFO] Axe CLI:
https://www.npmjs.com/package/@axe-core/cli
https://github.com/dequelabs/axe-core-npm/blob/develop/packages/cli/README.md
I use axe-core CLI for comparing native axe errors and axe errors in Pa11y:

[FIXME][ISSUE] axe 4.8.4 hangs When I run it for localhost URLs, for example:
“axe https://localhost:4147/Sublime-Text/KristinitaLuckyLink --chrome-options="ignore-certificate-errors" --verbose”
When I locally save the page “KristinitaLuckyLink.html”, axe-cli shows output.

[NOTE] No CodeSniffer CLI package. I can’t compare results
of CodeSniffer Pa11y and native CodeSniffer


[INFO] Transforming URLs retrieved from a sitemap before testing:
https://github.com/pa11y/pa11y-ci#sitemaps

[INFO] Pa11y allows to exclude Sitemap files using regular expressions:
https://github.com/search?q=--sitemap-exclude&type=code


[INFO] File “.pa11yci” must be JSON. JavaScript syntax will not work for it.
The user must create a JavaScript configuration file with a different name
and reference this file when running pally-ci — “pa11y-ci --config .pa11yci.js”

[INFO] pa11y-lint-config — lint configuration for Pa11y projects.
This is instrument for Pa11y CI developers:
https://github.com/pa11y/pa11y-lint-config
*/


/* eslint-disable unicorn/prefer-module --

[CONFIGURATION][NOTE] Pa11y doesn’t support ESM configurations:
https://github.com/pa11y/pa11y-ci/issues/250
https://github.com/pa11y/pa11y/issues/608 */
module.exports = {

	/* eslint-enable unicorn/prefer-module */

	defaults: {

		/* [INFO] Pa11y actions — Pa11y interactions on a web page:
		https://github.com/pa11y/pa11y#actions

		[NOTE] Pa11y haven’t action for “::selection”, “:focus” and “:hover”:
		https://github.com/pa11y/pa11y/issues/398#issuecomment-1857885618

		actions:
		*/


		/* [INFO] Launch options for the headless Chrome:
		https://github.com/pa11y/pa11y#chromelaunchconfig-object
		https://pptr.dev/next/api/puppeteer.puppeteerlaunchoptions

		[INFO] Ignore SSL errors.
		“ignoreHTTPSErrors: true” also ignore HTTPS errors, but
		“--ignore-certificate-errors” is a more specific option:
		https://stackoverflow.com/q/55207690/5951529

		[INFO] When user run https localserver with
		key and certificate signed by tools as node mkcert, pa11y-ci show error:
		“Error: net::ERR_CERT_AUTHORITY_INVALID at https://localhost:4147/”

		With this argument pa11y-ci successfully works with self-signed certificates.
		https://stackoverflow.com/a/17321045/5951529
		*/
		chromeLaunchConfig: {
			args: [
				"--ignore-certificate-errors"
			]
		},

		/* [FIXME][ISSUE] If I use the option “concurrency” with values “2” or “4”,
		for some pages I get error “Failed to run”, “Error: Protocol error: Connection closed.”
		I’m forced to disable the “concurrency” option:

		concurrency: 4,
		*/


		/* [INFO] HTML selectors that Pa11y CI doesn’t check.
		I ignore selectors solely if I get bugs when validating them in Pa11y */
		hideElements: [

			/* #####
			# Bugs #
			########
			[INFO] Errors I don’t reproduce when running newest axe-cli but get in Pa11y CI 3.1.0


			[FIXME][BUG] axe runner in Pa11y 3.1.0 incorrectly check contrast on pages,
			where I use “linear-gradient” for the background:

			[INFO] For Kristinita’s Search */
			".SashaKristinitaHeader", ".SashaKristinitaMotto",

			// [INFO] And for page 404
			".Sasha404Description",

			// [FIXME][BUG] axe incorrectly check contrast of aside text of standard articles, pages and auxiliary pages
			".SashaAsideBottomText",

			/* [FIXME][BUG] axe mark as invalid correctly contrasted “footnote-backref” symbol
			in the “Gingerinas/Грейзи-Фа” page */
			".footnote-backref",

			/* [FIXME][BUG] Strange axe bug for the article
			“IT-articles/Fastest-way-to-add-new-version-of-Sublime-Text-3-package” page */
			"a[href='#GitHub-token']",

			/* [FIXME][BUG] axe error “Elements must have sufficient color contrast”
			for elements with class “KiraPDFLink” in all articles/pages */
			".KiraPDFLink",

			/* [FIXME][BUG] Strange axe bug for the article
			“Gingerinas/Пример-разбора-игры-СпортСИ” */
			".progress-60plus"

			/* #############
			# Third-party #
			###############
			[INFO] Accessibility problems when using third-party tools.
			Amazing Grace scripts patched all of them.


			[PATCH] Elements from Google Translate Element

			Patched in the file “google-translate-custom-widget/gtcw-accessibility.coffee”

			"#goog-gt-votingForm", "#goog-gt-votingHiddenPane", "#goog-gt-votingInputSrcLang",
			"#goog-gt-votingInputTrgLang", "#goog-gt-votingInputSrcText", "#goog-gt-votingInputTrgText",
			"#goog-gt-votingInputVote", ".skiptranslate", "iframe[id=':0.container']",
			"iframe[sandbox='allow-scripts']", "iframe[sandbox='allow-scripts']"


			[PATCH] Elements from Programmable Search Engine

			Patched in the file “programmable-search-engine-kristinitas-search.coffee”

			"#___gcse_0", ".gstl_50",
			*/
		],


		/* [INFO] Warnings and notices messages ignored by default.
		Use “includeNotices” and “includeWarnings” for enabling them:
		https://github.com/pa11y/pa11y#ignore-array
		https://github.com/pa11y/pa11y#includenotices-boolean
		https://github.com/pa11y/pa11y#includewarnings-boolean

		[INFO] “frame-tested” — frames should be tested with axe-core:
		https://dequeuniversity.com/rules/axe/4.8/frame-tested

		[NOTE] I haven’t found any example of what I should do, what I should inject
		so that the frames are tested by axe-core:
		https://github.com/dequelabs/axe-core/issues/1631#issuecomment-502357231


		[FIXME][BUG] When I use any third-party iframe element, I get error as this:

		• Frames should be tested with axe-core (https://dequeuniversity.com/rules/axe/4.2/frame-tested?application=axeAPI)

		  (#KiraUniqueContent > div:nth-child(10) > iframe)

		  <iframe title="KristinitaLuckyLink demonstration" src="https://video.ploud.fr/videos/embed/5d800b76-c468-4510-b2af-d84d28def4a9" loading="lazy"></iframe>

		[INFO] I don’t reproduce the problem use axe-cli
		*/
		ignore: [
			"frame-tested"
		],


		/* [INFO] If “true”, when running the “pa11y-ci” command,
		the user receives a big list of necessary checks in the console.

		[EXAMPLE]
		“Check that the link text combined with programmatically determined link context, or its title attribute,
		identifies the purpose of the link.”

		[INFO] The user receives in the console the information that he should know from the accessibility books.
		Numerous repetitive notices aren’t needed during daily use of Pa11y,
		they make it difficult to see errors and warnings.
		*/
		includeNotices: false,

		/* [FIXME] It might be a good idea to ignore some unnecessary warnings, but set “includeWarnings: true,”.
		I try it after Pa11y CI upgrading and migrating from Gemini Scrollbar to better alternative. */
		includeWarnings: false,

		/* [INFO] Test content inside specific HTML element, not full HTML:
		https://github.com/pa11y/pa11y#rootelement-element
		rootElement: */

		/* [INFO] Pa11y runners:
		https://github.com/pa11y/pa11y#runners
		I use both default runners — axe and CodeSniffer.

		[INFO] I can’t find third-party Pa11y accessibility runners
		*/
		runners: ["axe", "htmlcs"],

		/* [INFO] I selected WCAG2AA — strong accessibility level:
		https://ialabs.ie/what-is-the-difference-between-wcag-a-aa-and-aaa/
		https://accessibleweb.com/rating/aa/

		[INFO] WCAG2AA accessibility logos:
		https://www.w3.org/WAI/WCAG2AA-Conformance


		[INFO] WCAG2AAA standards:
		https://accessibleweb.com/rating/aaa/

		[NOTE] WCAG2AAA makes unrealistic 7:1 contrast ratio:
		https://accessibleweb.com/knowledgebase/perceivable/1-4-distinguishable/01-04-06-contrast-enhanced-level-aaa/
		*/
		standard: "WCAG2AA",

		/* [INFO] Required for massive files as “Gingerinas/Библиотека-для-джинджерин”

		[FIXME] Split a large file “Gingerinas/Библиотека-для-джинджерин” */
		timeout: 140_000
	}
};
