using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;

namespace SunEngine
{
    public static class InfoPrinter
    { 
        public static void PrintVoidStartInfo()
        {
            Console.WriteLine("You start \"SunEngine.dll\" with out arguments.\nRun with \"help\" argument to list commands:\n\tdotnet SunEngine.dll help");
        }
        
        public static void PrintHelp()
        {
            var text = File.ReadAllText(Path.GetFullPath("Resources/help.txt"));
            Console.WriteLine(text);
        }

        public static void PrintVersion()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            FileVersionInfo fileVersionInfo = FileVersionInfo.GetVersionInfo(assembly.Location);
            string version = fileVersionInfo.ProductVersion;
            Console.WriteLine("SunEngine Version: " + version);
        }
    }
}