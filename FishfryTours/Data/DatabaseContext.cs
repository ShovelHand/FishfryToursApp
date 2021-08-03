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
		public DatabaseContext() { }
		public DatabaseContext(DbContextOptions options) : 
		
		
		base(options)
		{
		}

		
		public virtual DbSet<Boat> Boats 
		{ 
			get; 
			set; 
		}

		public virtual DbSet<Guide> Guides { get; set; }

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
