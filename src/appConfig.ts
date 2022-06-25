/**
 * app title
 */
export const appTitle = 'Admin panel'

/**
 * Use mock to proxy api requests: on, off  
 */
export const mock: SwitchType = 'on'

/**
 * Whether mock has namespace enabled, the file name will be spliced
 * into the url as a prefix after it is enabled
 */
export const mockNamespace: boolean = true

/**
 * mock proxy specified environment
 * Only start the mock in the development environment and the mock field of appConfig is 'on',
 * Due to the need for online preview, the environment is not limited here
 */
export const mockEnv: envType[] = ['development', 'staging', 'production']