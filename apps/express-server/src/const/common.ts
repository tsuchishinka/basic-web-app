import { yarnWorkspaceRootSync } from '@node-kit/yarn-workspace-root'
import path from 'path'
import { packageDirectorySync } from 'pkg-dir'

const WORKSPACE_PATH = yarnWorkspaceRootSync(process.cwd())!
const PACKAGE_PATH = packageDirectorySync()!
const CLIENT_STATIC_PATH = path.resolve(WORKSPACE_PATH, './apps/react-front/dist')
const CLIENT_HTML_PATH = path.resolve(CLIENT_STATIC_PATH, 'index.html')
const LIMIT_DEFAULT = 50

export { CLIENT_HTML_PATH, CLIENT_STATIC_PATH, LIMIT_DEFAULT, PACKAGE_PATH }
