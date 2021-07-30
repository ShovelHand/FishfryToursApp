using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FishfryTours.Models
{
	public class Boat
	{

		public int Id { get; set; }
		public string Name { get; set; }
		public string Status { get; set; }

	}
}
