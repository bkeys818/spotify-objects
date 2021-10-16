// jest.config.ts
import type { Config } from '@jest/types'

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/jest-extension/index.ts'],
}
export default config
