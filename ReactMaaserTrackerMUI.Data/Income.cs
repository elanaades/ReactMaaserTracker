using System.Text.Json.Serialization;

namespace ReactMaaserTrackerMUI.Data
{
    public class Income
    {
        public int Id { get; set; }
        public int SourceId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        [JsonIgnore]
        public Source Source { get; set; }
    }
}