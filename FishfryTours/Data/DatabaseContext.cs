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

		public DbSet<Guide> Guides { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			//	modelBuilder.Entity<Boat>().HasNoKey();
			//	modelBuilder.Entity<Guide>().HasNoKey();
			modelBuilder.Entity<Boat>(entity =>
			{
				entity.HasKey(e => e.Id);
			});
			modelBuilder.Entity<Guide>(entity =>
			{
				entity.HasKey(e => e.Id);
			});
		}

	}
}
