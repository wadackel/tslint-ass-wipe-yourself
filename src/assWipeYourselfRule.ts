import * as Lint from 'tslint';
import * as utils from 'tsutils';
import * as ts from 'typescript';

interface Options {
  annotations: string[];
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
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

  public static NON_ASSIGNEE_FAILURE: string =
    'Annotation comment requires the assignee name';
  public static INCORRECT_FORMAT_FAILURE: string = 'Semicolons can not be used';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(
      sourceFile,
      walk,
      parseOptions(this.ruleArguments),
    );
  }
}

function parseOptions(options: string[]): Options {
  return {
    annotations: options.length > 0 ? options : ['TODO', 'FIXME'],
  };
}

function walk(ctx: Lint.WalkContext<Options>): void {
  utils.forEachComment(
    ctx.sourceFile,
    (fullText: string, { kind, pos, end }: ts.CommentRange): void => {
      let start: number = pos + 2;

      if (
        kind !== ts.SyntaxKind.SingleLineCommentTrivia ||
        // exclude empty comments
        start === end ||
        // exclude /// <reference path="...">
        (fullText[start] === '/' &&
          ctx.sourceFile.referencedFiles.some(
            ref => ref.pos >= pos && ref.end <= end,
          ))
      ) {
        return;
      }

      // skip all leading slashes
      while (fullText[start] === '/') {
        ++start;
      }

      if (start === end) {
        return;
      }

      const commentText: string = fullText.slice(start, end);
      const tokens: string[] = commentText.split(' ');

      const annotation: string | undefined = ctx.options.annotations.find(
        (ant: string): boolean => new RegExp(`${ant}:?`).test(tokens[1]),
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
    },
  );
}
