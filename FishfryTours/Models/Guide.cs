using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishfryTours.Models
{
    public class Guide
    {
        int Id { get; set; }
        string Name { get; set; }
        string Phone { get; set; }
        string Email { get; set; }
        string EmergencyContact { get; set; }
    }
}
