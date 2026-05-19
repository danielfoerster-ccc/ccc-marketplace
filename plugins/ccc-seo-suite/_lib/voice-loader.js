// CCC SEO Suite — Voice Profile Loader
// Used by: ccc-seo-write-article, ccc-seo-client-handoff (and any skill that needs to know how to write in client's voice)
//
// Loads brand voice profile from client folder, returns as Prompt-Constraint string suitable for system-prompt injection.

const fs = require('fs');
const path = require('path');

function loadVoiceProfile({ clientFolderPath, language }) {
  language = language || 'de';
  const voicePath = path.join(clientFolderPath, '_voice', `voice.${language}.md`);
  if (!fs.existsSync(voicePath)) {
    return null;
  }
  return fs.readFileSync(voicePath, 'utf8');
}

function loadAuthorProfile({ clientFolderPath, authorSlug }) {
  authorSlug = authorSlug || 'primary';
  // Try slug first, then look for first .md in _authors/
  const direct = path.join(clientFolderPath, '_authors', `${authorSlug}.md`);
  if (fs.existsSync(direct)) {
    return fs.readFileSync(direct, 'utf8');
  }
  const authorsDir = path.join(clientFolderPath, '_authors');
  if (fs.existsSync(authorsDir)) {
    const files = fs.readdirSync(authorsDir).filter(f => f.endsWith('.md'));
    if (files.length > 0) {
      return fs.readFileSync(path.join(authorsDir, files[0]), 'utf8');
    }
  }
  return null;
}

// Extract Tone-Characteristics + DOs + DON'Ts + Conviction Statements as a compact prompt-constraint
function distillVoiceForPrompt(voiceMd) {
  if (!voiceMd) return '';
  // Heuristic: find sections matching common voice-profile section headers
  const sections = {};
  const headerRegex = /^##\s+(.+?)$/gm;
  let lastMatch = null;
  let lastStart = 0;
  const matches = [...voiceMd.matchAll(headerRegex)];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const next = matches[i + 1];
    const start = m.index + m[0].length;
    const end = next ? next.index : voiceMd.length;
    sections[m[1].toLowerCase().trim()] = voiceMd.slice(start, end).trim();
  }
  const interestingSections = Object.keys(sections).filter(k =>
    k.match(/tone|charakteristika|conviction|dos?\b|don'?ts?|sample|phrasierung/i)
  );
  if (interestingSections.length === 0) return voiceMd.slice(0, 2000);
  return interestingSections
    .map(k => `## ${k}\n${sections[k]}`)
    .join('\n\n');
}

module.exports = { loadVoiceProfile, loadAuthorProfile, distillVoiceForPrompt };
