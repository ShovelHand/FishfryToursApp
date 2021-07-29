using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Web;
using System.Threading.Tasks;

namespace FishfryTours.Models
{
	//FishfryDBConnection

	public class DatabaseContext : DbContext
	{
		public DatabaseContext(DbContextOptions options) : 
		
		
		base(options)
		{
		}

		
		public DbSet<Boat> Boats 
		{ 
			get; 
			set; 
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Boat>().HasNoKey();
		}

	}
}
