using Model;
using RepositoryLibrary;
using ServiceLibrary;

namespace WebApplication1.Controllers.CommandControllers
{
    public class BookmarkController : BaseCommandController<Bookmark>
    {
        public BookmarkController() : base(new BookmarkService(new BookmarkRepository(new BusinessDbContext())))
        {

        }
    }

    public class ProductBookmarkController : BaseCommandController<ProductBookmark>
    {
        public ProductBookmarkController() : base(new ProductBookmarkService(new ProductBookmarkRepository(new BusinessDbContext())))
        {

        }
    }
}