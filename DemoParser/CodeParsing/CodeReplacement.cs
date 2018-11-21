using System;
using System.Text.RegularExpressions;

namespace DemoParser.CodeParsing
{
    public class CodeReplacement
    {
        private const string ReplacementPrefix = "//replace:";
        private static readonly Regex ReplacementTokenFinder = new Regex(@"//replace:\s*([a-zA-z0-9]*)");

        public string ApplyTokens(string line)
        {
            if (string.IsNullOrWhiteSpace(line))
                return line;

            var valueToReplace = GetValueToReplace(line);

            return string.IsNullOrEmpty(valueToReplace)
                ? line
                : GetLineWithAppliedSyntax(line, valueToReplace);
        }

        private string GetValueToReplace(string line)
        {
            var match = ReplacementTokenFinder.Match(line);

            if (match.Success == false)
                return null;

            var captureGroup = match.Groups[1];
            return captureGroup.Value;
        }

        private string GetLineWithAppliedSyntax(string line, string valueToReplace)
        {
            var prefixStartIndex = line.IndexOf(ReplacementPrefix, StringComparison.OrdinalIgnoreCase);
            var trimmedLine = line.Substring(0, prefixStartIndex).TrimEnd();
            var tokenized = GetWithReplacementSyntax(trimmedLine, valueToReplace);
            return tokenized;
        }

        private string GetWithReplacementSyntax(string line, string valueToReplace) =>
            line.Replace(valueToReplace, $"[[{valueToReplace}]]");
    }
}
