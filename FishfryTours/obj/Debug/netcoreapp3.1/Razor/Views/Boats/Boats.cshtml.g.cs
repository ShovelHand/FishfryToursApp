#pragma checksum "C:\Users\Alex\source\repos\FishfryTours\FishfryToursApp\FIshfryTours\Views\Boats\Boats.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "96a39cc0381c89914ee80e4562cd7bd41542b8be"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Boats_Boats), @"mvc.1.0.view", @"/Views/Boats/Boats.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\Alex\source\repos\FishfryTours\FishfryToursApp\FIshfryTours\Views\_ViewImports.cshtml"
using React.AspNet;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\Alex\source\repos\FishfryTours\FishfryToursApp\FIshfryTours\Views\_ViewImports.cshtml"
using FishfryTours;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\Alex\source\repos\FishfryTours\FishfryToursApp\FIshfryTours\Views\_ViewImports.cshtml"
using FishfryTours.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"96a39cc0381c89914ee80e4562cd7bd41542b8be", @"/Views/Boats/Boats.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"2cfa68a0850877a81de8224454b74329bf07377e", @"/Views/_ViewImports.cshtml")]
    public class Views_Boats_Boats : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<IEnumerable<FishfryTours.Models.Boat>>
    {
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 3 "C:\Users\Alex\source\repos\FishfryTours\FishfryToursApp\FIshfryTours\Views\Boats\Boats.cshtml"
  
    ViewData["Title"] = "Boats";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "96a39cc0381c89914ee80e4562cd7bd41542b8be3746", async() => {
                WriteLiteral("\r\n    <title>Boats</title>\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "96a39cc0381c89914ee80e4562cd7bd41542b8be4740", async() => {
                WriteLiteral(@"

    <script crossorigin src=""https://cdnjs.cloudflare.com/ajax/libs/react/16.13.0/umd/react.development.js""></script>
    <script crossorigin src=""https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.0/umd/react-dom.development.js""></script>
    <script src=""https://cdnjs.cloudflare.com/ajax/libs/remarkable/1.7.1/remarkable.min.js""></script>
    <script");
                BeginWriteAttribute("src", " src=\"", 512, "\"", 550, 1);
#nullable restore
#line 16 "C:\Users\Alex\source\repos\FishfryTours\FishfryToursApp\FIshfryTours\Views\Boats\Boats.cshtml"
WriteAttributeValue("", 518, Url.Content("~/js/Fishfry.jsx"), 518, 32, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral("></script>\r\n\r\n    <div id=\"content\">\r\n        <tbody>\r\n");
#nullable restore
#line 20 "C:\Users\Alex\source\repos\FishfryTours\FishfryToursApp\FIshfryTours\Views\Boats\Boats.cshtml"
             foreach (var item in Model)
            {

#line default
#line hidden
#nullable disable
                WriteLiteral("                <tr>\r\n                    <td>\r\n                        ");
#nullable restore
#line 24 "C:\Users\Alex\source\repos\FishfryTours\FishfryToursApp\FIshfryTours\Views\Boats\Boats.cshtml"
                   Write(Html.DisplayFor(modelItem => item.Name));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                    </td>\r\n                    <td>\r\n                        ");
#nullable restore
#line 27 "C:\Users\Alex\source\repos\FishfryTours\FishfryToursApp\FIshfryTours\Views\Boats\Boats.cshtml"
                   Write(Html.DisplayFor(modelItem => item.Status));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                    </td>\r\n                 \r\n                </tr>\r\n");
#nullable restore
#line 31 "C:\Users\Alex\source\repos\FishfryTours\FishfryToursApp\FIshfryTours\Views\Boats\Boats.cshtml"
            }

#line default
#line hidden
#nullable disable
                WriteLiteral("        </tbody>\r\n\r\n    </div>\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n</html>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IEnumerable<FishfryTours.Models.Boat>> Html { get; private set; }
    }
}
#pragma warning restore 1591
