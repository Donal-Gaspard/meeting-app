using Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Data
{
    public class ReservasionsStore
    {
        private const string _fileName = "reservations.json";
        public static List<Reservation> Reservations
        {
            get
            {
                using (StreamReader r = new StreamReader(_fileName))
                {
                    string json = r.ReadToEnd();
                    return JsonConvert.DeserializeObject<List<Reservation>>(json);
                }
            }
        }

        public static bool? Save(List<Reservation> reservations)
        {
            try
            {
                using (StreamWriter file = File.CreateText(_fileName))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    //serialize object directly into file stream
                    serializer.Serialize(file, reservations);
                }
                return true;
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
