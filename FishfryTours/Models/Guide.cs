using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;

namespace FishfryTours.Models
{
    public class Guide
    {
        public int Id { get; set; }
        public int AssignedBoatId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
