'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Lint = require('tslint');
const utils = require('tsutils');
const ts = require('typescript');
class Rule extends Lint.Rules.AbstractRule {
  apply(sourceFile) {
    return this.applyWithFunction(
      sourceFile,
      walk,
      parseOptions(this.ruleArguments),
    );
  }
}
Rule.metadata = {
  ruleName: 'ass-wipe-yourself',
  description: 'todo',
  optionsDescription: 'todo',
  options: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  type: 'style',
  typescriptOnly: false,
};
Rule.NON_ASSIGNEE_FAILURE = 'Annotation comment requires the assignee name';
Rule.INCORRECT_FORMAT_FAILURE = 'Semicolons can not be used';
exports.Rule = Rule;
function parseOptions(options) {
  return {
    annotations: options.length > 0 ? options : ['TODO', 'FIXME'],
  };
}
function walk(ctx) {
  utils.forEachComment(ctx.sourceFile, (fullText, { kind, pos, end }) => {
    let start = pos + 2;
    if (
      kind !== ts.SyntaxKind.SingleLineCommentTrivia ||
      start === end ||
      (fullText[start] === '/' &&
        ctx.sourceFile.referencedFiles.some(
          ref => ref.pos >= pos && ref.end <= end,
        ))
    ) {
      return;
    }
    while (fullText[start] === '/') {
      ++start;
    }
    if (start === end) {
      return;
    }
    const commentText = fullText.slice(start, end);
    const tokens = commentText.split(' ');
    const annotation = ctx.options.annotations.find(ant =>
      new RegExp(`${ant}:?`).test(tokens[1]),
    );
    if (annotation === undefined) {
      return;
    }
    if (/:$/.test(tokens[1])) {
      ctx.addFailure(start, end, Rule.INCORRECT_FORMAT_FAILURE);
      return;
    }
    if (tokens.length > 1 && /@[\w-]+/.test(tokens[2])) {
      return;
    }
    ctx.addFailure(start, end, Rule.NON_ASSIGNEE_FAILURE);
  });
}
