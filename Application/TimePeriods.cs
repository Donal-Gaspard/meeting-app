using System;
using System.Collections.Generic;
using System.Linq;

namespace Application
{
    public class TimePeriods
    {
        private const int CRENEAU = 24;

        public static List<string> GetTimePeriod()
        {
            return Enumerable.Range(0, CRENEAU).Select(x => $"{x}h - {x + 1}h").ToList();
        }

        public static List<string> GetAvaibillities(List<string> periods)
        {
            return GetTimePeriod().Except(periods).ToList();
        }
    }
}