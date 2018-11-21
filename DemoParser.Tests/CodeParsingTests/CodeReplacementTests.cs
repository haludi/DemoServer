using DemoParser.CodeParsing;
using Xunit;

namespace DemoParser.Tests.CodeParsingTests
{
    public class CodeReplacementTests
    {
        [Fact]
        public void AppliesReplacementToken()
        {
            var result = Act("Name = companyName,//replace:companyName");
            Assert.Equal("Name = [[companyName]],", result);
        }

        [Fact]
        public void ReturnsIdenticalLine_WhenNoReplacementDefined()
        {
            const string input = "Name = companyName,";
            var result = Act(input);
            Assert.Equal(input, result);
        }

        [Fact]
        public void TrimsEverythingAfterTheToken()
        {
            var result = Act("Name = companyName,//replace:companyName    additional text");
            Assert.Equal("Name = [[companyName]],", result);
        }

        [Fact]
        public void WorksWithSpacesInsideTheToken()
        {
            var result = Act("Name = companyName,//replace:    companyName");
            Assert.Equal("Name = [[companyName]],", result);
        }

        [Fact]
        public void DoesNotApplyToken_WhenNoValueMatched()
        {
            var result = Act("Name = companyName,//replace:otherName");
            Assert.Equal("Name = companyName,", result);
        }

        [Fact]
        public void TrimsWhitespacesOnEnd_WhenPlacedBeforeTheToken()
        {
            var result = Act("Name = companyName,        //replace:otherName");
            Assert.Equal("Name = companyName,", result);
        }

        [Fact]
        public void DoesNotTrimLeadingWhitespaces_WhenTokenProvided()
        {
            var result = Act("    Name = companyName,//replace:otherName");
            Assert.Equal("    Name = companyName,", result);
        }

        [Fact]
        public void DoesNotTrimLine_WhenNoTokenProvided()
        {
            var result = Act("Name = companyName,        ");
            Assert.Equal("Name = companyName,        ", result);
        }

        private string Act(string input)
        {
            var codeReplacement = new CodeReplacement();
            var result = codeReplacement.ApplyTokens(input);
            return result;
        }
    }
}
