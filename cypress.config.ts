import {defineConfig} from 'cypress';
import { LaunchMockApi } from 'src/tests/e2e/plugins';

export default defineConfig({
    projectId: 'axfe86',
    e2e: {
        baseUrl: 'http://localhost:4200',
        fixturesFolder: 'src/tests/e2e/fixtures',
        specPattern: 'src/tests/e2e/integration/**/*.cy.ts',
        screenshotsFolder: 'src/tests/e2e/screenshots',
        videosFolder: 'src/tests/e2e/videos',
        downloadsFolder: 'src/tests/e2e/downloads',
        supportFile: 'src/tests/e2e/support/index.ts',
        experimentalInteractiveRunEvents: true,
        experimentalSourceRewriting: true,
        requestTimeout: 10000,
        chromeWebSecurity: false,
        setupNodeEvents(on, config) {
            on('task', {
                // @ts-ignore
                launchMockApiTask(type: string) {
                    return new Promise((resolve, reject) => {
                        LaunchMockApi(type).then(data => {
                            console.info('MockApi Launched');
                            return resolve(true);
                        }).catch(err => {
                            console.info('MockApi error try Launched', err);
                            return resolve(false);
                        });
                    })
                }
            })
        }
    }
});
