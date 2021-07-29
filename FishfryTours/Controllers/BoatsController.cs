using FishfryTours.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace FishfryTours.Controllers
{
	public class BoatsController : Controller
	{

		public BoatsController(DatabaseContext context)
		{
			_context = context;
		}
		private readonly DatabaseContext _context;
		[HttpGet]
		public string Boats()
		{
			var boats = _context.Boats;
			return boats.First().Name;

		}
		
		[HttpGet]
		public string Ping(){
			return "hello world";
		}

	}
}
