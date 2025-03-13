const fs = require('fs-extra');
const path = require('path');
const url = require('url');

const resolve = path.resolve;

// Use __dirname directly in CommonJS
const __dirname = path.resolve();

// List of excluded workspaces
const EXCLUDED_WORKSPACES = ['noop', 'repo-tools'];

/**
 * Retrieves a list of workspace directory names from the 'workspaces' folder.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of workspace directory names,
 *                             excluding directories listed in EXCLUDED_WORKSPACES.
 * @throws {Error} If there are filesystem errors reading the directory
 */
async function listWorkspaces() {
  const rootPath = resolve(__dirname, '..');
  const workspacePath = resolve(rootPath, 'workspaces');

  return (await fs.readdir(workspacePath, { withFileTypes: true }))
    .filter(w => w.isDirectory() && !EXCLUDED_WORKSPACES.includes(w.name))
    .map(w => w.name);
}

// Export the function in CommonJS format
module.exports = { listWorkspaces };
