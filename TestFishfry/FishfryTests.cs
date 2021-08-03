using FishfryTours.Models;
using System;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Moq;
using FishfryTours.Controllers;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Xunit.Abstractions;

namespace TestFishfry
{
	[TestCaseOrderer("XUnit.Project.Orderers.AlphabeticalOrderer", "XUnit.Project")]
	public class FishfryTests
	{
		[Fact]
		public void GetBoats_ReturnsString()
		{
			var data = new List<Boat>
			{
				new Boat { Id = 1, Name = "BBB", Status="docked" },
				
			}.AsQueryable();
			var mockSet = new Mock<DbSet<Boat>>();
			mockSet.As<IQueryable<Boat>>().Setup(m => m.Provider).Returns(data.Provider);
			mockSet.As<IQueryable<Boat>>().Setup(m => m.Expression).Returns(data.Expression);
			mockSet.As<IQueryable<Boat>>().Setup(m => m.ElementType).Returns(data.ElementType);
			mockSet.As<IQueryable<Boat>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());
			var mockContext = new Mock<DatabaseContext>();
			mockContext.Setup(c => c.Boats).Returns(mockSet.Object);
			
			BoatsController controller = new BoatsController(mockContext.Object);
			var result = controller.CreateBoat(data.First());
			var boats = controller.GetBoats();
			//simply verify that a boats string is returned
			Assert.NotNull(boats);
			Assert.IsType<String>(boats);
		
		}

		[Fact]
		public void CreateBoat_ReturnsId()
		{
			
		var data = new List<Boat>
			{
				new Boat { Id = 1, Name = "BBB", Status="docked" },

			}.AsQueryable();

			var mockSet = new Mock<DbSet<Boat>>();
			var mockContext = new Mock<DatabaseContext>();

			BoatsController controller = new BoatsController(mockContext.Object);
			var result = controller.CreateBoat(data.First());
			var okResult = result as OkObjectResult;

			Assert.NotNull(okResult);
			Assert.Equal(1, okResult.Value);
		}

		[Fact]
		public void DeleteBoat_ReturnsOk(){
			var data = new List<Boat>
			{
				new Boat { Id = 1, Name = "BBB", Status="docked" },
				new Boat { Id = 2, Name = "AAA", Status="docked" },

			}.AsQueryable();
			var mockSet = new Mock<DbSet<Boat>>();
			mockSet.As<IQueryable<Boat>>().Setup(m => m.Provider).Returns(data.Provider);
			mockSet.As<IQueryable<Boat>>().Setup(m => m.Expression).Returns(data.Expression);
			mockSet.As<IQueryable<Boat>>().Setup(m => m.ElementType).Returns(data.ElementType);
			mockSet.As<IQueryable<Boat>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());
			var mockContext = new Mock<DatabaseContext>();
			mockContext.Setup(c => c.Boats).Returns(mockSet.Object);

			BoatsController controller = new BoatsController(mockContext.Object);
			var result = controller.DeleteBoat(1);
			var okResult = result as OkResult;
			Assert.NotNull(okResult);
			Assert.Equal(200, okResult.StatusCode);

		}

		[Fact] 
		void UpdateBoat_SetsNewStatus(){
			var data = new List<Boat>
			{
				new Boat { Id = 1, Name = "BBB", Status="docked" },

			}.AsQueryable();
			var mockSet = new Mock<DbSet<Boat>>();
			mockSet.As<IQueryable<Boat>>().Setup(m => m.Provider).Returns(data.Provider);
			mockSet.As<IQueryable<Boat>>().Setup(m => m.Expression).Returns(data.Expression);
			mockSet.As<IQueryable<Boat>>().Setup(m => m.ElementType).Returns(data.ElementType);
			mockSet.As<IQueryable<Boat>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());
			var mockContext = new Mock<DatabaseContext>();
			mockContext.Setup(c => c.Boats).Returns(mockSet.Object);

			BoatsController controller = new BoatsController(mockContext.Object);
			var result = controller.CreateBoat(data.First());
			string testStatus = "testStatus";
			controller.UpdateBoat(1, testStatus);
			Assert.Equal(data.First().Status, testStatus);
		}

		[Fact]
		void UpdateGuide_Works(){
			var data = new List<Guide>
			{
				new Guide { Id = 1, Name = "Guide1", AssignedBoatId=1 },

			}.AsQueryable();
			var mockSet = new Mock<DbSet<Guide>>();
			mockSet.As<IQueryable<Guide>>().Setup(m => m.Provider).Returns(data.Provider);
			mockSet.As<IQueryable<Guide>>().Setup(m => m.Expression).Returns(data.Expression);
			mockSet.As<IQueryable<Guide>>().Setup(m => m.ElementType).Returns(data.ElementType);
			mockSet.As<IQueryable<Guide>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());
			var mockContext = new Mock<DatabaseContext>();
			mockContext.Setup(c => c.Guides).Returns(mockSet.Object);

			BoatsController controller = new BoatsController(mockContext.Object);
			const int two = 2;
			var result = controller.UpdateGuide(data.First().Id, two);
			var okResult = result as OkResult;
			Assert.NotNull(okResult);
			Assert.Equal(200, okResult.StatusCode);
			Assert.Equal(data.First().AssignedBoatId, two);

		}
		[Fact]
		void CreateGuide_ReturnsOK()
		{
			var data = new List<Guide>
			{
				new Guide { Id = 1, Name = "Guide1", AssignedBoatId=1 },

			}.AsQueryable();
			var mockSet = new Mock<DbSet<Guide>>();
			var mockContext = new Mock<DatabaseContext>();
			mockContext.Setup(c => c.Guides).Returns(mockSet.Object);

			BoatsController controller = new BoatsController(mockContext.Object);
			var result = controller.CreateGuide(data.First());
			var okResult = result as OkObjectResult;

			Assert.NotNull(okResult);
			Assert.Equal(200, okResult.StatusCode);
		}
	}
}
