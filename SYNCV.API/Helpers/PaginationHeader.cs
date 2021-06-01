namespace SYNCV.API.Helpers
{
    public class PaginationHeader
    {
        public int currentPage { get; set; }
        public int itemsPerPage { get; set; }

        public int totalItems { get; set; }

        public int totalPages { get; set; }

        public PaginationHeader(int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            this.currentPage = currentPage;
            this.itemsPerPage = itemsPerPage;
            this.totalItems = totalItems;
            this.totalPages = totalPages;
        }

    }
}