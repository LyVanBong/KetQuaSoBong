using System.Linq;

namespace KetQuaSoBong.Extensions
{
    public static class ArrayExtensions
    {

        public static T[] SubArray<T>(this T[] array, int offset, int length)
        {
            return array.Skip(offset)
                 .Take(length)
                 .ToArray();
        }
    }
}
