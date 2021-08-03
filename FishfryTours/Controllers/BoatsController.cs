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
using Microsoft.EntityFrameworkCore;

namespace FishfryTours.Controllers
{
	public class BoatsController : Controller
	{

		public BoatsController(DatabaseContext context)
		{
			_context = context;
		}
		private readonly DatabaseContext _context;

		//Get all boat entities in DB
		[Route("GetBoats")]
		[HttpGet]
		public string GetBoats() 
		{
			try
			{
				var boats = _context.Boats;
				string boatJson = JsonSerializer.Serialize(boats);
				return boatJson;
			}
			catch(Exception e)
			{
				return e.Message;
			}
		}

		//Create new boat entity in DB
		[Route("CreateBoat")]
		[HttpPost]
		public IActionResult CreateBoat([Bind("Name,Status")] Boat boat)
		{ 
			try
			{
				if (ModelState.IsValid)
				{
					_context.Add(boat);
					_context.SaveChanges();	
					return Ok(boat.Id);
				}
				else
					throw new Exception("Model state was not valid adding boat to database");
			}
			catch(Exception e)
			{
				return BadRequest(e.InnerException.Message);
			}
		}

		//Destroy boat entity in DB
		[Route("DeleteBoat")]
		[HttpPost]
		public IActionResult DeleteBoat(int id)
		{
			try
			{
				Boat boat = _context.Boats.FirstOrDefault(x => x.Id == id);
				if(ModelState.IsValid && boat != null)
				{
					_context.Remove(boat);
					_context.SaveChanges();
				}
				return Ok();
			}
			catch(Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[Route("UpdateBoat")]
		[HttpPost]
		public async Task<IActionResult> UpdateBoat(int id, string status = "")
		{
			try
			{
				Boat boat = _context.Boats.Find(id);
				if (ModelState.IsValid && boat != null)
				{
					if (!string.IsNullOrEmpty(status))
						boat.Status = status;
					_context.Update(boat);
					await _context.SaveChangesAsync();
					return Ok();
				}
				else
					throw new Exception($"No boat found, or modelstate invalid for action UpdateBoat. Boat id {id}");
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}


		//Get all boat entities in DB
		[Route("GetGuides")]
		[HttpGet]
		public string GetGuides()
		{
			try
			{
				var guides = _context.Guides;
				if (guides != null && guides.Any())
				{
					string guideJson = JsonSerializer.Serialize(guides);
					return guideJson;
				}
				else
					throw new Exception("no guides found in DB");
			}
			catch (Exception e)
			{
				return e.Message;
			}
		}

		//Create new guide entity in DB
		[Route("CreateGuide")]
		[HttpPost]
		public async Task<IActionResult> CreateGuide([Bind("Name,AssignedBoatId")] Guide guide)
		{
			try
			{
				if (ModelState.IsValid)
				{
					_context.Add(guide);
					await _context.SaveChangesAsync();
					return Ok(guide.Id);
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
		[Route("UpdateGuide")]
		[HttpPost]
		public IActionResult UpdateGuide(int id, int assignedBoatId) // not yet sure if we'll track boat to guide, or guide to boat
		{
			try
			{
				Guide guide = _context.Guides.Find(id);
				guide.AssignedBoatId = assignedBoatId;
				if(ModelState.IsValid && guide != null)
				{
					_context.Update(guide);
					return Ok();
				}
				else
					throw new Exception($"No guide found, or modelstate invalid for action UpdateGuide. Guide id {id}");
			}
			catch(Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		//Destroy guide entity in DB
		[HttpPost]
		public async Task<IActionResult> DeleteGuide(int id)
		{
			try
			{
				Guide guide = _context.Guides.Find(id);
				if (ModelState.IsValid && guide != null)
				{
					_context.Remove(guide);
					await _context.SaveChangesAsync();
				}
				return Ok();
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		//Views
		public async Task<IActionResult> Boats()
		{

			return View(await _context.Boats.ToListAsync());
		}

		public async Task<IActionResult> Guides()
		{

			return View(await _context.Guides.ToListAsync());
		}
	}
}
