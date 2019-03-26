using System.Collections.Generic;
using System.Collections.Immutable;
using SunEngine.Commons.Models.Authorization;

namespace SunEngine.Commons.Cache.CacheModels
{
    public class RoleCached
    {
        public int Id { get; }
        public string Name { get; }
        public string Title { get; }
        public ImmutableDictionary<int, CategoryAccessCached> CategoryAccesses { get; }

        public RoleCached(RoleTmp ug)
        {
            Id = ug.Id;
            Name = ug.Name;
            Title = ug.Title;
            CategoryAccesses = ug.CategoryAccesses
                .ToImmutableDictionary(x => x.CategoryId, x => new CategoryAccessCached(x));
        }
    }


    /// <summary>
    /// This class is only need to build UserGroupStored
    /// </summary>
    public class RoleTmp
    {
        public int Id;
        public string Name;
        public string Title;
        public List<CategoryAccessTmp> CategoryAccesses = new List<CategoryAccessTmp>();

        public RoleTmp(Role role)
        {
            Id = role.Id;
            Name = role.Name;
            Title = role.Title;
        }
    }
}