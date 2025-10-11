# Changelog

All notable changes to the OpenCDx Dashboard will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2025-10-11

### Added
- **Setup page**: System configuration viewer
  - Audit NATS configuration status display
  - Real-time status from `/audit/config/nats-status` API
  - Help text explaining audit publishing behavior
- **Dynamic dashboard metrics**: Real user/org/workspace counts from IAM API
- **Maps page placeholder**
- **Error boundaries**: Dashboard, Form Builder, Questionnaire Editor
- **Hooks**: `useUserList`, `useOrganizationList`, `useWorkspaceList`
- **Sidebar link**: Setup with settings icon

### Changed
- **"Submit Form" → "Save Form"**
- **Question accordion**: Defaults to expanded
- **ui-library dependency**: `file:../../ui-library` (was `/src`)
- **Sidebar icons**: Functions instead of JSX objects
- **Navbar**: Plain HTML (was NextUI components)

### Fixed
- **Next.js 15 async params**: Using `React.use()`
- **Hydration error**: `<p>` → `<div>` in InfoItem
- **API basePath**: Removed duplicate `/questionnaire`
- **Accordion accessibility**: Added `textValue` prop

## [1.0.0] - 2025-10-09

### Added
- Initial release of OpenCDx Dashboard
- Form Builder with drag-and-drop question management
- ANF (Analysis Normal Form) statement editor
- Questionnaire create, update, delete operations
- User authentication (login, signup, password reset)
- Multi-language support (English, Spanish) via next-intl
- Dark mode support
- Responsive design with Tailwind CSS
- NextUI v2 component library integration
- TypeScript support throughout
- Cypress and Playwright testing infrastructure

