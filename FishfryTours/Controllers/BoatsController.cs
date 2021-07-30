using FishfryTours.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Text.Json;

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
		public string GetBoats() 
		{
			try
			{

				var boats = _context.Boats;
				return JsonSerializer.Serialize(boats);
			}
			catch(Exception e)
			{
				return e.Message;
			}
		}
		
		
		//Create new boat entity in DB
		[HttpPost]
		public async Task<IActionResult> CreateBoat([Bind("Id,Name,Status")] Boat boat)
		{ 
			try
			{
				if (ModelState.IsValid)
				{
					_context.Add(boat);
					await _context.SaveChangesAsync();	
					return Ok();
				}
				else
					throw new Exception("Model state was not valid adding boat to database");
			}
			catch(Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		//Destroy boat entity in DB
		[HttpPost]
		public IActionResult DeleteBoat(int id)
		{
			
			return Ok();
		}

		//Create new guide entity in DB
		[HttpPost]
		public async Task<IActionResult> CreateGuide([Bind("Id,Name,Phone,Email,EmergencyContact")] Guide guide)
		{
			try
			{
				if (ModelState.IsValid)
				{
					_context.Add(guide);
					await _context.SaveChangesAsync();
					return Ok();
				}
				else
					throw new Exception("Model state was not valid adding guide to database");
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
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
