using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FishfryTours.Models
{
	//FishfryDBConnection

	public class DatabaseContext : DbContext
	{
		public DatabaseContext() : base("FishfryDBConnection")
		{
		}

		//public System.Data.Entity.DbSet<DotNetAppSqlDb.Models.Todo> Todoes { get; set; }
		//}

		//}
	}
}
