using Application;
using NUnit.Framework;
using System.Collections.Generic;

namespace ApplicationTest
{
    [TestFixture]
    public class Tests
    {

        [Test]
        public void ShouldBeContain24Slots()
        {
            Assert.AreEqual(TimePeriods.GetTimePeriod().Count,24);
        }

        [Test]
        public void ShouldBeContainSlot01AndSlot24()
        {
            Assert.AreEqual(TimePeriods.GetTimePeriod()[0], "0h - 1h");
            Assert.AreEqual(TimePeriods.GetTimePeriod()[23], "23h - 24h");
        }

        [Test]
        public void ShouldBeReturnTrueForPeriod8To9()
        {
            Assert.AreEqual(TimePeriods.GetAvaibillities(new List<string> { "8h - 9h" }).Count, 23);

        }
    }
}