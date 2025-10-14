# Obtaining and Setting Up Passcodes for Publishing

**Note: This is a human-readable guide for manual setup and configuration. It is not intended for automated execution by tools like grok-code or other AI/command-line interfaces. Follow these steps manually in your development environment to ensure secure authentication for package publishing.**

This guide explains how to obtain and configure the necessary authentication tokens (passcodes) for publishing the MVP project's server JAR to GitHub Packages and the client NPM package to the NPM registry. These tokens are required for deployment but are not committed to the repository for security reasons.

## Prerequisites
- GitHub account with repository access.
- NPM account.
- Access to your local machine's terminal/command line.

## Step 1: Obtain GitHub Personal Access Token (PAT) for Maven Deployment

The server JAR is deployed to GitHub Packages using Maven. You need a PAT for authentication.

### How to Obtain the PAT
1. Log in to GitHub (github.com).
2. Click your profile picture (top-right) > **Settings**.
3. In the left sidebar, scroll to **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
4. Click **Generate new token (classic)**.
5. Give it a descriptive name, e.g., "MVP Maven Deploy".
6. Select scopes: Check **write:packages** and **read:packages**.
7. Click **Generate token**.
8. **Important**: Copy the token immediately—it won't be shown again. Store it securely (e.g., in a password manager).

### How to Set Up the PAT for Maven
1. Locate or create the Maven settings file: `~/.m2/settings.xml` (on macOS/Linux, this is in your home directory under `.m2/`).
2. Open `settings.xml` in a text editor.
3. Add the following inside the `<settings>` tag (create `<servers>` if it doesn't exist):

   ```xml
   <servers>
       <server>
           <id>github</id>
           <username>andypaul65</username>
           <password>YOUR_GITHUB_PAT_HERE</password>
       </server>
   </servers>
   ```

4. Replace `YOUR_GITHUB_PAT_HERE` with the PAT you copied.
5. Save the file.
6. **Security Note**: Ensure `settings.xml` is not committed to version control. It should remain local.

### Verification
- Run `mvn deploy` from `/Users/andypaul/dev/MVP/server/server/`.
- If authentication fails, double-check the PAT and settings.xml.

## Step 2: Obtain NPM Token for Client Package Publishing

The client TypeScript package is published to the NPM registry.

### How to Obtain the NPM Token
1. Log in to NPM (npmjs.com) using your account.
2. Click your profile picture > **Account**.
3. In the left sidebar, click **Access Tokens**.
4. Click **Generate New Token**.
5. Select **Automation** or **Publish** (for publishing packages).
6. Give it a name, e.g., "MVP Client Publish".
7. Click **Generate Token**.
8. **Important**: Copy the token immediately. Store it securely.

### How to Set Up the NPM Token
1. Open the `.npmrc` file in `/Users/andypaul/dev/MVP/client/` (it should already exist with placeholders).
2. It currently looks like:

   ```
   registry=https://registry.npmjs.org/
   //registry.npmjs.org/:_authToken=${NPM_TOKEN}
   ```

3. Replace `${NPM_TOKEN}` with your actual NPM token.
4. Save the file.
5. **Security Note**: `.npmrc` is in `.gitignore`, so it won't be committed. Keep it local.

### Verification
- Run `npm publish` from `/Users/andypaul/dev/MVP/client/`.
- If authentication fails, verify the token and .npmrc format.

## Additional Notes
- **Token Security**: Never share or commit tokens. Rotate them periodically.
- **Scopes**: Ensure PAT has the correct GitHub scopes; NPM token has publish permissions.
- **Troubleshooting**: If issues persist, check GitHub/NPM account permissions or token expiration.
- **Environment Variables**: For CI/CD, consider using environment variables instead of hardcoding tokens.

Once set up, you can proceed with publishing. Refer to `docs/guidelines/expansion-guide.md` for deployment commands.

## See Also
- [Expansion Guide](../guidelines/expansion-guide.md): Deployment details.
- [Subproject Integration Guide](../subprojects/subproject-integration-guide.md): For subproject setup.