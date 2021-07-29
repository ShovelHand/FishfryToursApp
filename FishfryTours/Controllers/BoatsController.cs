using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace FishfryTours.Controllers
{
	public class BoatsController : Controller
	{
		[HttpGet]
		public string Boats()
		{

			return "Hello world";
		}
	}
}
