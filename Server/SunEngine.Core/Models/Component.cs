using System.Collections.Generic;

namespace SunEngine.Core.Models
{
	public class Component
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string UrlToken { get; set; }
		public string Type { get; set; }
		public string Roles { get; set; }
		public bool IsCacheData { get; set; }
		public string Options { get; set; }
	}
}