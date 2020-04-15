using SunEngine.Core.Configuration.ConfigItemType;

namespace SunEngine.Core.SectionsData
{
	public class MaterialsClientSectionData : ClientSectionData
	{
		[ConfigItem(typeof(CategoriesItem))] public string CategoriesNames { get; set; }
		[ConfigItem(typeof(IntegerItem))] public int DeepLevel { get; set; } = 0;
		[ConfigItem(typeof(BooleanItem))] public bool ShowAuthor { get; set; } = true;
		[ConfigItem(typeof(BooleanItem))] public bool ShowPublishDate { get; set; } = true;
		[ConfigItem(typeof(BooleanItem))] public bool ShowComments { get; set; } = true;
	}
}