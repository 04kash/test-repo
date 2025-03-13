#!/usr/bin/env node

import { listWorkspaces } from './list-workspaces.js';
import { Octokit } from '@octokit/rest';

async function main() {
  const issueBody = process.env.ISSUE_BODY;
  const issueNumber = process.env.ISSUE_NUMBER;
  const token = process.env.GITHUB_TOKEN;

  if (!issueBody || !issueNumber || !repo || !token) {
    console.error('❌ Missing required environment variables.');
    process.exit(1);
  }

  // Parse issue body to get Workspace name (should be like 2nd line)
  const regex = /Workspace\s*[\r\n]+([^\r\n]+)/;
  const match = issueBody.match(regex);

  let workspace = '';
  if (match) {
    workspace = match[1].trim();
  }
  // Get list of workspaces from list-workspaces.js and check if extracted workspace is valid. Else add needs-triaging label
  const workspaces = await listWorkspaces();
  let label = 'needs-triaging';
  if (workspaces.includes(workspace)) {
    label = `workspace/${workspace}`;
  }

  const octokit = new Octokit({ auth: token });

  try {
    await octokit.issues.addLabels({
      owner: 'backstage',
      repo: 'community-plugins',
      issue_number: Number(issueNumber),
      labels: [label],
    });

    console.log(`✅ Label "${label}" added successfully!`);
  } catch (error) {
    console.error(`❌ Failed to add label: ${error.message}`);
    process.exit(1);
  }
}
main().catch(console.error);
