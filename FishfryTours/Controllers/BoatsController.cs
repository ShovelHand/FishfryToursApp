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
			try
			{

				var boats = _context.Boats;
				return boats.First().Name;
			}
			catch(Exception e)
			{
				return e.Message;
			}
		}
		
		[HttpGet]
		public string Ping(){
			return "hello world";
		}

	}
}
