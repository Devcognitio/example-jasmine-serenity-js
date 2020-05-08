const
    { ArtifactArchiver } = require('@serenity-js/core'),
    { ConsoleReporter } = require('@serenity-js/console-reporter'),
    { Photographer, TakePhotosOfInteractions } = require('@serenity-js/protractor'),
    { SerenityBDDReporter } = require('@serenity-js/serenity-bdd')

exports.config = {
    baseUrl: 'https://www.demoblaze.com/',

    chromeDriver: require(`chromedriver/lib/chromedriver`).path,

    directConnect: true,

    allScriptsTimeout: 110000,

    framework:      'custom',
    frameworkPath:  require.resolve('@serenity-js/protractor/adapter'),

    specs: [ './spec/**/*.spec.ts', ],

    serenity: {
        runner: 'jasmine',
        crew: [
            ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
            ConsoleReporter.forDarkTerminals(),
            Photographer.whoWill(TakePhotosOfInteractions),
            new SerenityBDDReporter(),
        ]
    },

     onPrepare: function() {
         browser.waitForAngularEnabled(false);
     },

    jasmineNodeOpts: {
        requires: [ 'ts-node/register' ],
    },

    capabilities: {
        browserName: 'chrome',

        loggingPrefs: {
            browser: 'INFO'
        },

        chromeOptions: {
            args: [
                '-lang=es',
                '--disable-popup-blocking',
                '--disable-download-notification',
                '--start-maximized',
                '--ignore-certificate-errors',
                '--allow-running-insecure-content',
                '--disable-translate',
                '--always-authorize-plugins',
                '--disable-extensions'
            ]
        }
    }
};
