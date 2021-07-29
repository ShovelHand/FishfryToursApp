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

		//just to test with Postman, etc.
		[HttpGet]
		public string Ping() 
		{
			return "hello world";
		}

		//Get all boat entities in DB
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
		
		
		//Create new boat entity in DB
		[HttpPost]
		public IActionResult CreateBoat()
		{

			return Ok();
		}

		//Destroy boat entity in DB
		[HttpPost]
		public IActionResult DeleteBoat(int id)
		{

			return Ok();
		}

		//Create new guide entity in DB
		[HttpPost]
		public IActionResult CreateGuide()
		{

			return Ok();
		}

		//update Guide info in DB (phone, email, etc.)
		[HttpPost]
		public IActionResult UpdateGuide(int id)
		{

			return Ok();
		}


		//Assign a guide to a boat
		[HttpPost]
		public IActionResult AssignGuideToBoat(int boatId, int guideId)
		{

			return Ok();
		}

	}
}
