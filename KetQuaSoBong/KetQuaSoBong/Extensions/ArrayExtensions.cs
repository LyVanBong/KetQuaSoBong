using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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
